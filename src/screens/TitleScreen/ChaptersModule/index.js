import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { TextPrimary, TextSecondary } from '../../../components/Text';
import useTheme from '../../../hooks/useTheme';
import RippleButton from '../../../components/Button/RippleButton';
import Borderless from '../../../components/Button/Borderless';
import { useNavigation } from '@react-navigation/native';
import { useManga } from '../MangaContext';
import { getChapters } from '../../../services';
import BlankButton from '../../../components/Button/BlankButton';
import { ScrollView } from 'react-native';
import moment from 'moment';

const ChaptersModule = () => {
  const manga = useManga();
  const [chapters, setChapters] = useState([]);
  const [page, setPage] = useState(1);
  const ref = useRef();
  const [allLoaded, setAllLoaded] = useState(false);

  useEffect(() => {
    fetchMore();
  }, [manga]);

  const fetchMore = () => {
    if (manga?.branches) {
      getChapters(manga.branches[0].id, page).then((data) => {
        setChapters((e) => e.concat(data));
        if (data.length === 0) setAllLoaded(true);
      });
      setPage((e) => e + 1);
    }
  };

  const renderItem = (item, index) => (
    <ChapterPreview chapter={item} key={index} />
  );

  return (
    <ScrollView
      allLoaded={allLoaded}
      ref={ref}
      heightForIndexPath={(item, index) => 57}
      onEndReached={fetchMore}
      onEndReachedThreshold={0.5}
      data={chapters}
      renderItem={renderItem}
      renderHeader={() => (
        <View style={{ overflow: 'hidden' }}>
          <View style={{ marginTop: 20 }}>
            <RippleButton onPress={() => {}} style={styles.sortContainer}>
              <MaterialIcons name="sort" size={18} />
              <TextPrimary size={16}>Сортировать</TextPrimary>
            </RippleButton>
          </View>
        </View>
      )}
      keyExtractor={(item, idx) => item.id}
      numColumns={1}
      onLoading={fetchMore}
    >
      {chapters.map(renderItem)}
    </ScrollView>
  );
};

const ChapterPreview = ({ chapter }) => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  return (
    <View
      style={{
        borderColor: theme.backgroundFill3,
        borderBottomWidth: 1,
      }}
    >
      <BlankButton
        style={styles.container}
        onPress={() =>
          navigation.navigate('MangaReaderScreen', { chapter: chapter.id })
        }
      >
        <Borderless style={styles.watchIcon}>
          <MaterialIcons
            name="remove-red-eye"
            size={22}
            color={theme.textMuted}
          />
        </Borderless>
        <View style={styles.mainInfoContainer}>
          <TextPrimary size={14}>
            Том {chapter.tome} Глава {chapter.chapter}
          </TextPrimary>
          <View style={styles.dataContainer}>
            <TextSecondary size={13}>
              {moment(new Date(chapter.upload_date)).locale('ru').fromNow()}
            </TextSecondary>
            <View style={styles.userContainer}>
              <MaterialIcons name="verified-user" color={theme.textMuted} />
              <TextSecondary size={13}> {chapter.user}</TextSecondary>
            </View>
          </View>
        </View>
        <Borderless style={styles.iconEdit}>
          <MaterialIcons name="edit" size={22} color={theme.textMuted} />
        </Borderless>
        <Borderless style={styles.downloadIcon}>
          <MaterialIcons
            name="file-download"
            size={22}
            color={theme.textMuted}
          />
        </Borderless>
      </BlankButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 7,
    paddingVertical: 2,
  },
  dataContainer: { flexDirection: 'row', alignItems: 'center' },
  iconEdit: {
    marginLeft: 'auto',
  },
  userContainer: {
    flexDirection: 'row',
    marginLeft: 16,
    alignItems: 'center',
  },
  watchIcon: {
    marginLeft: 5,
  },
  mainInfoContainer: {
    paddingLeft: 10,
  },
  downloadIcon: {
    marginHorizontal: 10,
  },
  mainContainer: {
    borderTopWidth: 1,
  },
  sortContainer: {
    flexDirection: 'row',
    marginLeft: 10,
    marginBottom: 10,
    marginRight: 'auto',
    padding: 5,
  },
});

export default ChaptersModule;
