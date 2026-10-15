import type { Config } from '@react-router/dev/config';

export default {
    appDirectory: 'app',
    ssr: false,
    prerender: ['/', '/legal', '/legal/privacy', '/legal/license'],
} satisfies Config;
