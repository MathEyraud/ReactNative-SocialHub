export const slideFromRightAnimation = {

    gestureDirection: 'horizontal',

    transitionSpec: {
      open: {
        animation: 'timing',
        config: {
          duration: 400,
        },
      },

      close: {
        animation: 'timing',
        config: {
          duration: 400,
        },
      },
    },

    cardStyleInterpolator: ({ current, layouts }) => {
      return {
        cardStyle: {
          transform: [
            {
              translateX: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [layouts.screen.width, 0],
              }),
            },
          ],
        },
      };
    },
};