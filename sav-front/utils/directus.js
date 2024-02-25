import { createDirectus, rest, authentication  } from '@directus/sdk';


const NEXT_PUBLIC_DIRECTUS_HOST = process.env.NEXT_PUBLIC_DIRECTUS_HOST



const directus = createDirectus(NEXT_PUBLIC_DIRECTUS_HOST).with(authentication('cookie', { credentials: 'include',  autoRefresh: true, })).with(rest({ credentials: "include" }));
// const directus = createDirectus(NEXT_PUBLIC_DIRECTUS_HOST).with(rest());


export default directus;