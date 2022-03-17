import React from 'react'
import { act, screen, render, waitFor } from '@testing-library/react'

// import API mocking utilities from Mock Service Worker
import { rest } from 'msw'
import { setupServer } from 'msw/node'

import StarWars from '../components/StarWars'

const server = setupServer(
  // capture "GET" requests to the Star Wars API
  rest.get('https://swapi.dev/api/films/', (_req, res, ctx) => {
    // Respond using a mocked JSON body
    return res(
      ctx.json({
        results: [
          {
            title: 'Star Wars and the Half-Blood Ewok',
            episode_id: -1,
            opening_crawl:
              "This Ewok's looking a bit peaky. Tensions are in unrest across the stars and also the wars…",
          },
        ],
      })
    )
  })
)

beforeAll(() => server.listen())
afterAll(() => server.close())

describe(StarWars, () => {
  it('display film information returned from API call', async () => {
    // When testing, code that causes React state updates should be wrapped in act(...)
    await act(async () => {
      const component = render(<StarWars />)
      expect(component.baseElement).toMatchSnapshot('StarWars')

      // We wait until what we expect is on the page
      await waitFor(() =>
        component.getByText('Star Wars and the Half-Blood Ewok')
      )
      expect(component.baseElement).toMatchSnapshot('StarWars After Load')

      // By this point, all the text should be rendered
      expect(
        screen.getByText(
          "This Ewok's looking a bit peaky. Tensions are in unrest across the stars and also the wars…"
        )
      ).toBeInTheDocument()
    })
  })
})
