import { render } from '@testing-library/react';
import React from 'react';

describe('uid', () => {
    beforeEach(() => {
        vi.resetModules();
    });

    it('return null by default', async () => {
        const { UID } = await import('./uid');
        expect(UID).toBeNull();
    });

    it('return UID from profile link', async () => {
        render(
            <div className="header">
                <div className="partition">
                    <div className="menu-l">
                        <a href="/uid12345">Profile</a>
                    </div>
                </div>
            </div>
        );

        const { UID } = await import('./uid');
        expect(UID).toEqual('12345');
    });
});
