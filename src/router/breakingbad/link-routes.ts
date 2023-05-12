export interface RouterLink {
    name: string;
    path: string;
    title: string;
}

export const breakingBadRouteLinks: RouterLink[] = [
    {path: '/breakingbad/home', name: 'breakingbadHome', title: 'Home'},
    {path: '/breakingbad/about', name: 'breakingbadAbout', title: 'About'},
    {path: '/breakingbad/characters', name: 'breakingbadCharacters', title: 'Characters'},
];