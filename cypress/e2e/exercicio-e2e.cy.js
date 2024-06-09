/// <reference types="cypress" />
import produtosPage from "../support/page_objects/produtos.page";
import {faker} from '@faker-js/faker';

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
  /*  Como cliente 
      Quero acessar a Loja EBAC 
      Para fazer um pedido de 4 produtos 
      Fazendo a escolha dos produtos
      Adicionando ao carrinho
      Preenchendo todas opções no checkout
      E validando minha compra ao final */

  beforeEach(() => {
    cy.viewport(1280, 1000)
    produtosPage.visitarUrl('')
      //cy.visit('/produtos')
      
  });

  it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
      //TODO: Coloque todo o fluxo de teste aqui, considerando as boas práticas e otimizações
      let fone = '+55 91983243157';
      let cep = '66896-500'

      cy.fixture('produtos').then( dados => {
        produtosPage.buscarProdutoLista(dados[0].nomeProduto)
        produtosPage.addProdutoCarrinho(dados[0].tamanho, 
            dados[0].cor, 
            dados[0].quantidade)
        cy.get('.woocommerce-message').should('contain', dados[0].nomeProduto)
        cy.get('#primary-menu > .menu-item-629 > a').click()

        produtosPage.buscarProdutoLista(dados[1].nomeProduto)
        produtosPage.addProdutoCarrinho(dados[1].tamanho, 
            dados[1].cor, 
            dados[1].quantidade)
        cy.get('.woocommerce-message').should('contain', dados[1].nomeProduto)
        cy.get('#primary-menu > .menu-item-629 > a').click()

        produtosPage.buscarProdutoLista(dados[2].nomeProduto)
        produtosPage.addProdutoCarrinho(dados[2].tamanho, 
            dados[2].cor, 
            dados[2].quantidade)
        cy.get('.woocommerce-message').should('contain', dados[2].nomeProduto)
        cy.get('#primary-menu > .menu-item-629 > a').click()

        produtosPage.buscarProdutoLista(dados[3].nomeProduto)
        produtosPage.addProdutoCarrinho(dados[3].tamanho, 
            dados[3].cor, 
            dados[3].quantidade)
        cy.get('.woocommerce-message').should('contain', dados[3].nomeProduto)
        cy.get('.woocommerce-message > .button').click()

        cy.get('.checkout-button').click()

        cy.get('#billing_first_name').type(faker.person.firstName())
        cy.get('#billing_last_name').type(faker.person.lastName())
        cy.get('#billing_company').type(faker.company.buzzPhrase())
        cy.get('#billing_address_1_field > label').type(faker.location.buildingNumber())
        cy.get('#billing_address_2').type(faker.location.cardinalDirection())
        cy.get('#billing_city').type(faker.location.city())
        cy.get('#billing_postcode').type(cep)
        cy.get('#billing_phone').type(fone)
        cy.get('#billing_email').type(faker.internet.email())
        cy.get('#createaccount').click()
        cy.get('#account_password').type(faker.number.int())
        cy.get('#order_comments').type('teste Ebac')

        cy.get('#payment_method_cod').click()
        cy.get('#terms').click()
        cy.get('#place_order').click()

        cy.contains('h1', 'Pedido recebido').should('contain', 'Pedido recebido')
      })  
  })


})