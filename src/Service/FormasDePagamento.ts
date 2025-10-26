// service/FormasDePagamentoService.js

// Importa as classes de modelo atualizadas
import { FormaDePagamento, Pix, CartaoCredito, Boleto, CartaoDebito } from "../models/FormasDePagamento.js";

/**
 * Serviço responsável por gerenciar as formas de pagamento disponíveis por usuário.
 */
export class FormasDePagamentoService {
    /**
     * Simula um armazenamento em memória: idUsuario -> [FormaDePagamento, ...]
     * @private
     * @type {Map<string, FormaDePagamento[]>}
     */
    #armazenamento;

    constructor() {
        this.#armazenamento = new Map();
    }

    /**
     * Busca todas as formas de pagamento cadastradas para um usuário.
     * @param {string} idUsuario - O ID único do usuário.
     * @returns {FormaDePagamento[]} Lista de formas de pagamento.
     */
    listarFormasPorUsuario(idUsuario) {
        // Retorna a lista, ou um array vazio se não houver
        return this.#armazenamento.get(idUsuario) || [];
    }

    /**
     * Adiciona uma nova forma de pagamento ao armazenamento do usuário.
     * @param {string} idUsuario - O ID único do usuário.
     * @param {FormaDePagamento} forma - O objeto da forma de pagamento.
     * @returns {FormaDePagamento[]} Lista atualizada de formas de pagamento.
     */
    adicionarFormaDePagamento(idUsuario, forma) {
        // Verifica se a forma de pagamento é válida antes de armazenar
        if (!forma.validar()) {
            throw new Error(`Dados da forma de pagamento '${forma.tipo}' inválidos.`);
        }

        const formas = this.listarFormasPorUsuario(idUsuario);
        formas.push(forma);
        this.#armazenamento.set(idUsuario, formas);

        return formas;
    }

    /**
     * Cria uma forma de pagamento do tipo correto com base nos dados e a adiciona.
     * @param {string} idUsuario - O ID único do usuário.
     * @param {object} dados - Os dados da forma de pagamento (inclui 'tipo').
     * @returns {FormaDePagamento[]} Lista atualizada de formas de pagamento.
     */
    criarEAdicionarForma(idUsuario, dados) {
        // Usa os nomes de propriedades da nova modelagem: chave_pix, numero_cartao, validade, cvv, codigo_barras
        const { tipo, numero_cartao, nome_titular, validade, cvv, chave_pix, codigo_barras } = dados;
        let novaForma;
        
        // Factory para criar o objeto da forma de pagamento
        switch (tipo) {
            case 'PIX':
                if (!chave_pix) throw new Error("Chave PIX é obrigatória.");
                novaForma = new Pix(chave_pix);
                break;
            case 'CARTAO_CREDITO':
                if (!numero_cartao || !nome_titular || !validade || !cvv) {
                     throw new Error("Dados incompletos para Cartão de Crédito.");
                }
                novaForma = new CartaoCredito(numero_cartao, nome_titular, validade, cvv);
                break;
            case 'BOLETO':
                // Simula o código de barras se não for fornecido
                novaForma = new Boleto(codigo_barras || `COD-BOLETO-${Date.now()}`);
                break;
            case 'CARTAO_DEBITO':
                 if (!numero_cartao || !nome_titular || !validade || !cvv) {
                     throw new Error("Dados incompletos para Cartão de Débito.");
                }
                novaForma = new CartaoDebito(numero_cartao, nome_titular, validade, cvv);
                break;
            default:
                throw new Error(`Tipo de pagamento não suportado: ${tipo}`);
        }

        // Adiciona e valida a nova forma
        return this.adicionarFormaDePagamento(idUsuario, novaForma);
    }
}
