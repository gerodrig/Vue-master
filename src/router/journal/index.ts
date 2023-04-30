import { RouteLocationNormalized as Route } from 'vue-router';

export const RouteNames = {
    HOME: 'daybook',
    ENTRY: 'entry',
    NOENTRY: 'no-entry',
  }

export default {
    name: RouteNames.HOME,
    component: () => import(/* webpackChunkName: "daybook" */ '@layouts/journal/DayBookLayout.vue'), 
    children: [
        {
            path: '',
            name: RouteNames.NOENTRY,
            component: () => import(/* webpackChunkName: "daybook-no-entry" */ '@/views/journal/NoEntrySelected.vue') 

        },
        {
            path: ':id',
            name: RouteNames.ENTRY,
            component: () => import(/* webpackChunkName: "daybook-entry" */ '@/views/journal/EntryView.vue'),
            props: (route: Route) => {
                return {
                    id: route.params.id
                }
            }
        }
    ],
}

