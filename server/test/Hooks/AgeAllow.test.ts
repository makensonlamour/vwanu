
import feathers from '@feathersjs/feathers';
import AgeAllow from "../../src/Hooks/AgeAllow";


// Mocking feathersjs' HookContext


describe('AgeAllow Hook', () => {
    let app;

    beforeEach(() => {
        jest.resetModules();
        process.env.MIN_AGE = '14';
        app = feathers();
        app.use('/dummy', {
            async get(id) {
                return { id };
            },
        });

        app.service('dummy').hooks({
            before: {
                get: AgeAllow,
            },
        });
    });
    it('should return true if the user is over or has age', async () => {

        const currentYear = new Date().getFullYear();
        const passingYear = currentYear - +process.env.MIN_AGE;
        const birthdate = new Date(passingYear, 1, 1);
        const params = {
            User: {
                birthdate
            }
        }
        const response = await app.service('dummy').get(1, params);
        expect(response).toEqual({ id: 1 });

    });

    it('should return false if the user is under age', async () => {

        const currentYear = new Date().getFullYear();
        const tooYoung = currentYear - (+process.env.MIN_AGE + 5);
        const birthdate = new Date(tooYoung, 1, 1);

        const params = {
            User: {
                birthdate
            }
        }
        try {
            await app.service('dummy').get(1, params);
        } catch (error) {

            expect(error.message).toContain(`You must be at least ${process.env.MIN_AGE} years old`);
        }
    });

});