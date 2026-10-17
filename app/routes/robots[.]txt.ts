import { robotsTxt } from '~/lib/seo/robots'

export function loader() {
    return new Response(robotsTxt(), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
