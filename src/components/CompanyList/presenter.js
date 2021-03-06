import React from 'react';
import { View, Text, RefreshControl, FlatList } from 'react-native';

import CompanyItem from '../CompanyItem';
import { FavButton, NoteIcon, PoweredBy } from '../commons';

const CompanyList = (props) => {
  const { companies } = props;
  return (
    <View style={styles.companyListViewStyle}>
      <CompanyListHeader {...props} />
      <FlatList
        refreshControl={(
          <RefreshControl
            refreshing={props.isFetching}
            onRefresh={props.refresh}
            tintColor="grey"
          />
        )}
        data={companies}
        keyExtractor={c => c.id.toString()}
        renderItem={c => <CompanyItem id={c.item.id} company={c.item} likeButton />}
      />
      <PoweredBy poweredby="Logos provided by Clearbit" />
    </View>
  );
};

const CompanyListHeader = (props) => {
  const { companies, numOfFavorites, numOfNotes } = props;
  const numOfCompanies = companies.length;
  return (
    <View style={styles.companyListHeaderStyle}>
      <View style={styles.userHeaderStyle}>
        <UserLikedCompany numOfFavorites={numOfFavorites} numOfCompanies={numOfCompanies} />
        <UserNotedCompany numOfNotes={numOfNotes} numOfCompanies={numOfCompanies} />
      </View>
    </View>
  );
};

const UserLikedCompany = (props) => {
  likes = { isLiked: true };
  const likesPerCompanies = `${props.numOfFavorites}/${props.numOfCompanies}`;
  return (
    <View style={styles.userHeaderContentsWrapperStyle}>
      <View style={styles.userHeaderInfoViewStyle}>
        <FavButton {...likes} />
      </View>
      <View style={styles.userHeaderInfoViewStyle}>
        <Text style={styles.HeaderContentsText}>{likesPerCompanies}</Text>
      </View>
    </View>
  );
};

const UserNotedCompany = (props) => {
  const notesPerCompanies = `${props.numOfNotes}/${props.numOfCompanies}`;
  return (
    <View style={styles.userHeaderContentsWrapperStyle}>
      <View style={styles.userHeaderInfoViewStyle}>
        <NoteIcon visible={{ isNote: true }} />
      </View>
      <View style={styles.userHeaderInfoViewStyle}>
        <Text style={styles.HeaderContentsText}>{notesPerCompanies}</Text>
      </View>
    </View>
  );
};

const styles = {
  companyListViewStyle: {
    marginBottom: 48
  },
  HeaderContentsText: {
    color: 'green',
    fontFamily: 'Avenir Next'
  },
  userHeaderContentsWrapperStyle: {
    marginLeft: 65,
    flexDirection: 'row',
    width: 80,
    alignItems: 'center'
  },
  companyListHeaderStyle: {
    backgroundColor: '#dcdde1',
    height: 30
  },
  companyListHeaderText: {
    size: 8,
    color: 'blue'
  },
  userHeaderInfoViewStyle: {
    marginLeft: 5,
    marginRight: 5
  },
  userHeaderStyle: {
    padding: 5,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  }
};

export default CompanyList;
