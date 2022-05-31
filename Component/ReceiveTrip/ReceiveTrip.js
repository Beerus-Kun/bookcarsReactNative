import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, Button, RefreshControl } from 'react-native';
import firebase, { firestore } from '../../Firebase';
import CustomerBookingItem from './ListCustomerBooking.jsx';
import global from '../../global';

const ListCustomer = ({ navigation, route }) => {
  const [isLoading, setLoading] = useState(true);
  const [listCustomer, setListCustomer] = useState([]);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetch(`${global.urlAPI}person/api/get_booking`)
      .then((response) => response.json())
      .then((json) => {
        setListCustomer(json);
        // console.log(json)
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setLoading(false);
      });
    // wait(2000).then(() => setRefreshing(false));
    setRefreshing(false)
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Booking',
      headerBackTitleVisible: false,
    });
  }, [navigation]);
  useEffect(() => {
    fetch(`${global.urlAPI}person/api/get_booking`)
      .then((response) => response.json())
      .then((json) => {
        setListCustomer(json);
        // console.log(json)
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setLoading(false);
      });
  }, []);
  const enterBooking = (id) => {
    navigation.navigate('toInfoDetailBooking', { id: id });
  };
  return (
    // <SafeAreaView>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        {listCustomer.map((customer) => (
          <CustomerBookingItem
            key={customer.id}
            id={customer.id}
            customerName={customer.full_name}
            start_point={customer.start_point}
            end_point={customer.end_point}
            enterBooking={enterBooking}
          />
        ))}
      </ScrollView>
    // </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  flatList: {
    marginBottom: 10,
    flex: 0.9,
  },
  messageFieldView: {
    flex: 0.1,
  },
});

export default ListCustomer;
