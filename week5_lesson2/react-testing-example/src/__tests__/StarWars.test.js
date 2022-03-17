import React from 'react';
import { act, render, waitFor, screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import StarWars from '../components/StarWars';

const server = setupServer(
  rest.get('https://swapi.dev/api/films/', (_req, res, ctx) => {
    return res(
      ctx.json({
        results: [
          {
            title: 'Star Wars and the Half-Blood Ewok',
            episode_id: -1,
            opening_crawl:
              "This Ewok's looking a bit peaky. Tensions are in unrest across the stars and also the wars...",
          },
        ],
      })
    );
  })
);

beforeAll(() => server.listen());
afterAll(() => server.close());

describe('<StarWars/>', () => {
  it('displays film info returned from API call', async () => {
    await act(async () => {
      const component = render(<StarWars />);
      expect(component.baseElement).toMatchSnapshot('StarWars before data');

      // wait until what we expect to be on the page is actually there
      await waitFor(() =>
        component.getByText('Star Wars and the Half-Blood Ewok')
      );
      expect(component.baseElement).toMatchSnapshot('StarWars after data');

      // by now, all the text from the api should have been rendered
      expect(
        screen.getByText(
          "This Ewok's looking a bit peaky. Tensions are in unrest across the stars and also the wars..."
        )
      ).toBeInTheDocument();
    });
  });
});
