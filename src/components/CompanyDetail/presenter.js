import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Platform
} from 'react-native';
import { Icon } from 'react-native-elements';
import { TextInput } from 'react-native-paper';

import { LogoImage, InfoBox, BottomInfoBox, Tag, FavButton, PoweredBy } from '../commons';

const CompanyDetail = (props) => {
  const { companyInfo, date } = props;

  return (
    <View style={styles.container}>
      <ScrollView style={{ height: '89%' }} keyboardDismissMode="on-drag">
        <InfoBox>
          <View style={styles.titleContent}>
            <LogoImage {...companyInfo} size="medium" />
            <Text style={styles.titleTextStyle}>{companyInfo.name}</Text>
          </View>
        </InfoBox>
        <InfoBox>
          <NoteInfo {...props} />
        </InfoBox>
        <InfoBox>
          <EventInfo {...companyInfo} date={date} />
        </InfoBox>
        <InfoBox>
          <DetailInfo {...companyInfo} />
        </InfoBox>
      </ScrollView>
      <PoweredBy poweredby="Logos provided by Clearbit" />
      <BottomInfoBox>
        <TouchableOpacity onPressOut={props.handleLike}>
          <View style={styles.actionButton}>
            <Text style={{ paddingHorizontal: 10, fontFamily: 'Avenir Next' }}>
              {props.isLiked ? 'Delete from List' : 'Add to Favorite'}
            </Text>
            <FavButton isLiked={props.isLiked} />
          </View>
        </TouchableOpacity>
      </BottomInfoBox>
    </View>
  );
};

const NoteInfo = (props) => {
  const mode = props.isEditting ? 'outline' : 'flat';

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View style={{ flex: 1 }}>
        <TextInput
          style={styles.inputContainerStyle}
          mode={Platform.OS === 'android' ? 'outline' : mode}
          label="Note"
          placeholder="Make note"
          placeholderTextColor="grey"
          value={props.note}
          onChangeText={props.handleEdit}
          autoCorrect={false}
          multiline
          onFocus={props.inputFocus}
          onBlur={props.inputFocus}
        />
      </View>
    </View>
  );
};

const EventInfo = (props) => {
  const index = props.date.indexOf('00:00:00') - 1;
  const date = props.date.slice(0, index);

  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 5 }}>
        <Icon name="calendar" type="entypo" />
        <Text style={{ marginLeft: 20 }}>{date}</Text>
      </View>
      <Text style={styles.textStyle}>{props.fair}</Text>
      <Text
        style={styles.hrefTextStyle}
        onPress={() => Linking.openURL(`http://${props.company_url}`)}
      >
        http://
        {props.company_url}
      </Text>
    </View>
  );
};

const DetailInfo = (props) => {
  return (
    <View>
      <Text style={styles.detailTextStyle}>We are hiring</Text>
      <View style={styles.tagStyle}>
        {props.hiring_types.map(type => (
          <Tag key={type} type={type} color="#487eb0" />
        ))}
      </View>
      <Text style={styles.detailTextStyle}>Majors</Text>
      <View style={styles.tagStyle}>
        {props.hiring_majors.map(type => (
          <Tag key={type} type={type} color="#e1b12c" />
        ))}
      </View>
      <Text style={styles.detailTextStyle}>Degrees</Text>
      <View style={styles.tagStyle}>
        {props.degree.map(type => (
          <Tag key={type} type={type} color="#22a6b3" />
        ))}
      </View>
      {props.visa === 'yes' && <Text style={styles.detailTextStyle}>F1/H1B Sponsor Supported</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column'
  },
  titleContent: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    alignItems: 'center'
  },
  titleTextStyle: {
    padding: 5,
    fontSize: 20,
    fontFamily: 'Avenir Next'
  },
  textStyle: {
    paddingVertical: 2,
    fontFamily: 'Avenir Next'
  },
  hrefTextStyle: {
    paddingVertical: 2,
    fontFamily: 'Avenir Next',
    color: 'blue'
  },
  detailTextStyle: {
    paddingVertical: 3,
    fontFamily: 'Avenir Next',
    fontSize: 16
  },
  tagStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 6
  },
  actionButton: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    paddingVertical: 1
  },
  inputContainerStyle: {
    margin: 1
  }
});

export default CompanyDetail;
