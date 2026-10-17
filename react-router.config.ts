import type { Config } from '@react-router/dev/config';

export default {
    appDirectory: 'app',
    ssr: false,
    prerender: ['/', '/roadmap', '/legal', '/legal/privacy', '/legal/license'],
} satisfies Config;
