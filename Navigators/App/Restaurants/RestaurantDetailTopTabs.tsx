import React, { useContext, useState, useEffect } from 'react';
import { Dimensions, ActivityIndicator } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import { ThemeContext } from 'react-native-elements';
import { DishesListComponent } from '../../../UIComponents/DishesListComponent';
import { adhocRestaurant } from './restaurants.types';
import { dishList } from '../../../data/fake-data';
import { AppNavigationProp } from '../Index/app.types';

interface RestaurantDetailTopTabsProps {
  restaurant: adhocRestaurant,
  navigation: AppNavigationProp<'RestaurantDetail'>,
}


export const RestaurantDetailTopTabs: React.FC<RestaurantDetailTopTabsProps> = ({ restaurant, navigation }) => {
  const { theme } = useContext(ThemeContext);
  const [index, setIndex] = useState(0);
  const [tabs, setTabs] = useState<{ key: string, title: string }[]>([]);

  useEffect(() => {
    if (restaurant) {
      setTabs(restaurant.cuisines.map(cuisine => ({
        key: cuisine,
        title: cuisine.toUpperCase()
      })));
    }
  }, [restaurant, setTabs]);

  return (
    <TabView
      lazy
      renderLazyPlaceholder={() => <ActivityIndicator color={theme.colors?.primary} />}
      renderTabBar={props => <TabBar
        activeColor={theme.colors?.primary}
        inactiveColor={theme.colors?.grey3}
        indicatorStyle={{
          backgroundColor: theme.colors?.primary
        }}
        style={{
          backgroundColor: 'white',
          borderTopWidth: 1,
          borderTopColor: theme.colors?.grey4
        }}
        scrollEnabled={true}
        {...props} />}
      navigationState={{ index, routes: tabs }}
      renderScene={({ route }) => {
        return <DishesListComponent
          dishes={dishList}
          onSelectDish={(dishId) => navigation.navigate('RestaurantAddToCart', { dishId })}
        />
      }
      }
      onIndexChange={setIndex}
      initialLayout={{
        width: Dimensions.get('window').width,
      }}
    />
  );
}
