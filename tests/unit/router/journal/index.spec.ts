import { describe, expect, it } from 'vitest';
import daybookRouter, { RouteNames } from '../../../../src/router/journal/';
import { RouteLocationNormalized as Route } from 'vue-router';

describe('tests in router module in Daybook', () => {
  it('should check that routeName matches', async () => {
    expect(RouteNames).toMatchObject({
      HOME: 'daybook',
      ENTRY: 'entry',
      NOENTRY: 'no-entry',
    });

    expect(daybookRouter).toMatchObject({
      name: RouteNames.HOME,
      component: expect.any(Function),
      children: [
        {
          path: '',
          name: RouteNames.NOENTRY,
          component: expect.any(Function),
        },
        {
          path: ':id',
          name: RouteNames.ENTRY,
          component: expect.any(Function),
          props: expect.any(Function),
        },
      ],
    });

    // expect((await daybookRouter.children[0].component()).default.name).toBe('NoEntrySelected');
    // expect((await daybookRouter.children[1].component()).default.name).toBe('EntryView');

    const promiseRoutes = await Promise.all(
      daybookRouter.children.map((child) => child.component())
    );

    const routes = promiseRoutes.map((route) => route.default.name);

    expect(routes).toContain('NoEntrySelected');
    expect(routes).toContain('EntryView');
  });

  it('should return the id route param', () => {
        const route = {
        params: {
            id: 'ABC-123',
        },
        } as unknown as Route;

        //find the children with name 'entry'
        const props = daybookRouter.children.find(child => child.name === RouteNames.ENTRY).props(route);

        expect(props).toEqual({ id: 'ABC-123' });
    });
});

