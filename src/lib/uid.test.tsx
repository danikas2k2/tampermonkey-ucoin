import { render } from '@testing-library/react';
import React from 'react';

describe('uid', () => {
    it('return null by default', async () => {
        jest.isolateModules(() => {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            expect(require('./uid').UID).toBeNull();
        });
    });

    it('return UID from profile link', async () => {
        jest.isolateModules(() => {
            render(
                <div className="header">
                    <div className="partition">
                        <div className="menu-l">
                            <a href="/uid12345">Profile</a>
                        </div>
                    </div>
                </div>
            );
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            expect(require('./uid').UID).toEqual('12345');
        });
    });
});
