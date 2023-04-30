import { beforeAll, describe, expect, it } from 'vitest';
import { createStore } from 'vuex';

import journalStore from '@/store/journal';

import journal from 'tests/unit/mocks/journal/test-journal-state';
import { JournalState, Entry } from '@interfaces/journal/index';
import { authApi } from '@/api';

//define the mock store
const createVuexStore = (initialState: JournalState) =>

createStore({
  modules: {
    journal: {
      ...journalStore,
      state: { ...initialState },
    },
  },
});

  beforeAll(async () => {
    const { data} = await authApi.post(':signInWithPassword', {
      email: 'test@test.com',
      password: '123456',
      returnSecureToken: true,
    });

    localStorage.setItem('idToken', data.idToken);
  }) 

 

describe('Vuex - Tests in Journal Module Store', () => {
  it('should have the initial state', () => {
    const store = createVuexStore(journal);

    const { isLoading, entries } = store.state.journal as JournalState;

    expect(isLoading).toBeTruthy();
    expect(entries).toEqual(journal.entries);
  });

  //Mutation test
  it('mutation: setEntries', () => {
    const store = createVuexStore({
      isLoading: true,
      entries: [],
    });

    store.commit('journal/setEntries', journal.entries);
    
    expect(store.state.journal?.entries.length).toBe(5);
    store.commit('journal/setEntries', [...journal.entries, ...journal.entries]);
    expect(store.state.journal?.entries.length).toBe(10);

    expect(store.state.journal?.isLoading).toBeFalsy();
  });

    //Mutation update Entry
    it('mutation: updateEntry', () => {
        const store = createVuexStore(journal);

        //updaed entry
        const updatedEntry = {
            id: '-NTjmJFqzTb23OCUVF3z',
            date: 1645204752204,
            text: 'I saw my chinchillas sleeping and she is very fluffy',
        }

        //mutation commit
        store.commit('journal/updateEntry', updatedEntry);

        const storeEntries = store.state.journal?.entries;

        // EXPECT
        // entries.lenght = 5
        expect(storeEntries?.length).toBe(5);


        // entry id must be included in the entries to be equal to the updated entry
        expect(storeEntries?.find(e => e.id === updatedEntry.id)).toEqual(updatedEntry);
    });

    //Mutation add Entry
    it('mutation: addEntry and deleteEntry', () => {
        const store = createVuexStore(journal);

        const newEntry = {
            id: 'ABC-123',
            date: 1645204844436,
            text: 'my chicnhilla is very fluffy and cute',
            picture: 'https://picsum.photos/200/300?random=1',
        }

        //mutation commit add new entry
        store.commit('journal/addEntry', newEntry);

        let storeEntries = store.state.journal?.entries;

        // EXPECTS addEntry

        expect(storeEntries?.length).toBe(6);

        //entry with id ABC-123 must be included in the entries
        expect(storeEntries?.find(e => e.id === newEntry.id)).toBeTruthy();
        //check that entry includes picture
        expect(storeEntries?.find(e => e.picture === newEntry.picture)).toBeTruthy();

        //deleteEntry ABC-123
        store.commit('journal/deleteEntry', newEntry.id);

        storeEntries = store.state.journal?.entries;

        // EXPECTS
        // entries must be 5
        expect(storeEntries?.length).toBe(5);

        //entry with ABC-123 must not be included in the entries
        expect(storeEntries?.find(e => e.id === newEntry.id)).toBeFalsy();
    });

    //Getters
    it('getters: getEntriesByTerm and getEntriesById', () => {
        //getterbyTerm returns a function
        const store = createVuexStore(journal);

        const getters = store.getters['journal/getEntriesByTerm'];

        expect(getters('').length).toBe(store.state.journal?.entries.length);

        expect(getters('chinchilla').length).toBe(2);

        const [,, entry3, entry4,,entry6] = store.state.journal?.entries as Entry[];

        expect(getters(entry3.text)[0]).toMatchObject(entry3)
        expect(getters(entry4.text)[0]).toMatchObject(entry4);

        expect(entry6).toBeFalsy();

        //use get entry by id to get entry 3
        const getById = store.getters['journal/getEntriesById'];

        expect(getById(entry3.id)).toMatchObject(entry3);

    });

    //Actions
    it('actions: loadEntries', async () => {
        const store = createVuexStore({ isLoading: true, entries: [] });

        await store.dispatch('journal/loadEntries');

        expect(store.state.journal!.entries.length > 0).toBeTruthy();

    });

    it('actions: updateEntry', async () => {
        const store = createVuexStore(journal);

        const updatedEntry = {
            id: '-NTjmJFqzTb23OCUVF3z',
            date: 1645204752204,
            text: 'I saw my chinchillas sleeping and she is very fluffy',
            picture: 'https://picsum.photos/200/300?random=1',
        }

        await store.dispatch('journal/updateEntry', updatedEntry);

        const storeEntries = store.state.journal?.entries;
        
        // EXPECT
        // entries.lenght = 5
        expect(storeEntries!.length > 0).toBeTruthy();

        expect(storeEntries?.find(e => e.id === updatedEntry.id)).toEqual({
            id: '-NTjmJFqzTb23OCUVF3z',
            date: 1645204752204,
            text: 'I saw my chinchillas sleeping and she is very fluffy',
            picture: 'https://picsum.photos/200/300?random=1',
        });
    });

    it('actions: createEntry, deleteEntry', async () => {
        //createEntry
        const store = createVuexStore(journal);

        const newEntry = {
            date: 1645204844436,
            text: 'New entry from test',
            picture: 'https://picsum.photos/200/300?random=1',
        }

        //dipaatch createEntry action
        const id = await store.dispatch('journal/createEntry', newEntry);

        // EXPECTS
        // id must be a string
        expect(typeof id).toBe('string');

        const createdEntry = store.state.journal?.entries.find(e => e.id === id);
        //new entry must be included in the entries
        expect(createdEntry).toBeTruthy();

        //deleteEntry dispatch
        await store.dispatch('journal/deleteEntry', createdEntry);

        //new entry must not exist in the entries
        expect(store.state.journal?.entries.find(e => e.id === id)).toBeFalsy();
    });

});
