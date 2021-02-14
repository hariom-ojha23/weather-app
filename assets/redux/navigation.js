export const state = {
    type: 'drawer',
    key: 'drawer-1',
    routeNames: ['Home', 'Favorite Cities'],
    routes: [
        {
            key: 'home-1', name: 'Home',
            state : {
                key: 'stack-1',
                routeNames: ['Weather'],
                routes: [
                    { key: 'Weather-1', name: 'Weather'}
                ],
                index: 0,
            },
        },
        {
            key: 'favorites-1', name: 'Favorite Cities'
        },
    ],
    index: 1
  };