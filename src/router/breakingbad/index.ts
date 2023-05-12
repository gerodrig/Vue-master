import type { RouteRecordRaw } from 'vue-router';
import CharacterId from '@/pages/breakingbad/characters/CharacterId.vue';
import CharacterList from '@/pages/breakingbad/characters/CharacterList.vue';
import CharacterSearch from '@/pages/breakingbad/characters/CharacterSearch.vue';

export const RouteNames = {
  ROOT: 'breakingbad',
    HOME: 'characters',
    ID: 'character-id',
    LIST: 'character-list',
    SEARCH: 'character-search',
  }

export default {
    path: 'breakingbad/characters',
    name: RouteNames.HOME,
    redirect: '/breakingbad/characters/list',
    component: () => import('@/layouts/breakingbad/CharacterLayout.vue'),
    children: [
        { 
          path: 'by/:id',
          name: RouteNames.ID,
          props: { title: 'By Id', visible: false},
          component: CharacterId,

        },
        {
          path: 'list',
          name: RouteNames.LIST,
          props: { title: 'List', visible: true},
          component: CharacterList,
        },
        {
          path: 'search',
          name: RouteNames.SEARCH,
          props: { title: 'Search', visible: true},
          component: CharacterSearch,
        }
    ]

} as RouteRecordRaw;

