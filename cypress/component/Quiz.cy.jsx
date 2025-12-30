/// <reference types="cypress" />

import { mount } from 'cypress/react18';
import Quiz from '../../client/src/components/Quiz';

describe('Quiz Component', () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: 'GET',
        url: '/api/questions/random',
      },
      {
        fixture: 'questions.json',
        statusCode: 200,
      }
    ).as('getRandomQuestion');
  });

  it('should start the quiz and display the first question', () => {
    mount(<Quiz />);
    cy.get('button').contains('Start Quiz').click();
    cy.get('.card').should('be.visible');
    cy.get('h2').should('not.be.empty');
  });

  it('should answer questions and complete the quiz', () => {
    mount(<Quiz />);
    cy.get('button').contains('Start Quiz').click();
    cy.get('button').contains('1').click();
    cy.get('.alert-success')
      .should('be.visible')
      .and('contain.text', 'Your score');
  });

  it('should restart the quiz after completion', () => {
    mount(<Quiz />);
    cy.get('button').contains('Start Quiz').click();
    cy.get('button').contains('1').click();
    cy.get('button').contains('Take New Quiz').click();
    cy.get('.card').should('be.visible');
    cy.get('h2').should('not.be.empty');
  });
});