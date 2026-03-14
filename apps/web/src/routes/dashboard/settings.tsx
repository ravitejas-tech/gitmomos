import * as React from 'react';
import { ComingSoon } from '../../components/ui/ComingSoon';

export default function DashboardSettings() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-primary-gradient mb-2">
                    Settings
                </h1>
                <p className="text-text-secondary">
                    Manage your account preferences and global CLI configuration.
                </p>
            </div>

            <ComingSoon 
                description="The settings panel is currently under development. Soon you'll be able to manage your API keys, notification preferences, and more."
            />
        </div>
    );
}
