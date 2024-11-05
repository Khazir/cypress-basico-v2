describe('Central de Atendimento ao Cliente TAT', () =>  {
    const threesc = 3000

 beforeEach(() => {
  cy.visit('./src/index.html')
    })
    
it('Verification of title', () => {    
    cy.title()
      .should('be.equal', 'Central de Atendimento ao Cliente TAT')
})
it('Asserting that the text fields are ready for typing and click button sends request', () => {
    const test = Cypress._.repeat('uma forma de', 20)

    cy.clock()

    cy.get('#firstName').should('be.visible').type('Daniel').should('have.value', 'Daniel')
    cy.get('#lastName').should('be.visible').type('Tiburcio').should('have.value', 'Tiburcio')
    cy.get('#email').should('be.visible').type('daniel@gmail.com').should('have.value', 'daniel@gmail.com')
    cy.get('#open-text-area').should('be.visible').invoke('val',test).should('have.value', test)
    cy.contains('button', 'Enviar').should('be.visible').click()
    cy.get('.success').should('be.visible')
    cy.tick (threesc)
    cy.get('.success').should('not.be.visible')

     //###Bloco para testar digitação errada de email###\\
     cy.get('#firstName').should('be.visible').type('Daniel').should('have.value', 'Daniel')
     cy.get('#lastName').should('be.visible').type('Tiburcio').should('have.value', 'Tiburcio')
     cy.get('#email').clear().should('be.visible').type('danielgmail.com').should('have.value', 'danielgmail.com')
     cy.contains('button', 'Enviar').should('be.visible').click()
     cy.get('.error').should('be.visible')

})

it('Checking if the phone number fields are being entered correctly', () =>{
    cy.get('#phone').type('qwertyuiopçlkjhgfdsazxcvbnm').should('have.value', '')
    
    })

it('Checking if the telephone field checkbox is marked, filling it out becomes mandatory.', () =>{
const test = Cypress._.repeat('uma forma de', 20)

    cy.get('#firstName').should('be.visible').type('Daniel').should('have.value', 'Daniel')
    cy.get('#lastName').should('be.visible').type('Tiburcio').should('have.value', 'Tiburcio')
    cy.get('#email').should('be.visible').type('daniel@gmail.com').should('have.value', 'daniel@gmail.com')
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').should('be.visible').invoke('val', test).should('have.value', test)
    cy.contains('button', 'Enviar').should('be.visible').click()
    cy.get('.error').should('be.visible') //erro ao não digitar o numero de telefone obrigatório
    cy.get('#phone').type('932223333') // digitação do numero
    cy.contains('button', 'Enviar').should('be.visible').click() //reenvio do formulário
    cy.get('.success').should('be.visible') //confirmação de sucesso
    })

it('Cleaning fields test check', () =>{
    //digitando, limpando e verificando os valores nos campos
    const test = Cypress._.repeat('uma forma de', 20)

    cy.get('#firstName').should('be.visible').type('Daniel').should('have.value', 'Daniel').clear().should('have.value', '')
    cy.get('#lastName').should('be.visible').type('Tiburcio').should('have.value', 'Tiburcio').clear().should('have.value', '')
    cy.get('#email').should('be.visible').type('daniel@gmail.com').should('have.value', 'daniel@gmail.com').clear().should('have.value', '')
    cy.get('#open-text-area').should('be.visible').invoke('val', test).should('have.value', test).clear().should('have.value', '')

    })

it('Checking the mandatory fields', () =>{

cy.contains('button', 'Enviar').should('be.visible').click()
cy.get('.error').should('be.visible') //erro ao não digitar campos obrigatórios
 
    })

it('Sends the formulary with custom comands', () => {
cy.fillMandatoryFieldsAndSubmit()
cy.get('.success').should('be.visible')
    
    })

it('Select YouTube product from select box', () => {
cy.get('#product').select('YouTube').should('have.value', 'youtube')
cy.get('#product').select('cursos').should('have.value', 'cursos')
cy.get('#product').select(3).should('have.value', 'mentoria')
cy.get('#product').select('Blog').should('have.value', 'blog')
    
    })
it('Testing the radio butons select option', () => {
cy.get('input[type="radio"][value="ajuda"]').check()
.should('have.value', 'ajuda')
.should('be.checked')
cy.get('input[type="radio"][value="elogio"]').check()
.should('have.value', 'elogio')
.should('be.checked')
cy.get('input[type="radio"][value="feedback"]').check()
.should('have.value', 'feedback')
.should('be.checked')

cy.get('input[type="radio"]')//testanto todos os 3 radio buttons
.should('have.length',3 )
.each(function ($radio) {
    cy.wrap($radio).check()
    cy.wrap($radio).should('be.checked')
        })
    })

it('Testing the checkbox buttons', () => {
cy.get('input[type="checkbox"]').check().should('be.checked')
.last().uncheck().should('not.be.checked')

    })

it('Testing upload data', () =>{
cy.get('input[type="file"]').should('not.have.value')
.selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
.should(function($input){
expect($input[0].files[0].name).to.equal('example.json')    
        })

    })

it('Assigning a alias to the exampeple file upload', () => {
cy.fixture('example.json').as('sampleFile')
cy.get('input[type="file"]')
.selectFile('@sampleFile')
.should(function($input){
expect($input[0].files[0].name).to.equal('example.json')
        })

    })

 it('Asserts that the privacy policy opens in another tab without click necessity', () => {
    cy.get('#privacy a').should('have.attr', 'target', '_blank')

 })  
 
 /*it('Opening the privacy policy tab in the same tab as the home page (removing the target attribute)', () => {
    cy.get('#privacy a').invoke('removeAttr', 'target').click()
    cy.contains('p', 'Talking About Testing').should('be.visible')

 })*/

it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
        cy.get('.success')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Mensagem enviada com sucesso.')
          .invoke('hide')
          .should('not.be.visible')
        cy.get('.error')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Valide os campos obrigatórios!')
          .invoke('hide')
          .should('not.be.visible')
      })

      it('Make a http request', () => {
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
        .should(function(response) {
            const {status, statusText, body} = response
            expect(status).to.equal(200)
            expect(statusText).to.equal('OK')
            expect(body).to.include('CAC TAT')
        })


      })

      it.only('Found the hiden cat', () =>{
        cy.get('#cat').invoke('show').should('be.visible').invoke('hide').should('not.be.visible')
      })

      

 })
