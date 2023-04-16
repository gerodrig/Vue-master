
import { describe, it, expect } from 'vitest';

describe('Example Component', () => {

    it('must be more than 10', () => {

        //arrange
        let value = 10;

        //act
        value = value + 2;

        //assert
        expect(value).toBeGreaterThan(10);

    });
});

export {}