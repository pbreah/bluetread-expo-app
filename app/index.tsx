import styled from 'styled-components/native'
import { Stack } from 'expo-router'
import LinkButton from 'src/components/LinkButton'
import ScreenLayout from 'src/components/ScreenLayout'
import { useAssets } from 'expo-asset'
import { ImageSourcePropType, ListRenderItem, TextInputChangeEventData } from 'react-native'
import ScrollItem from 'src/components/ScrollItem'
import { StatusBar } from 'expo-status-bar'
import { useApiData } from 'src/utils/hooks'
import { useEffect, useRef, useState } from 'react'
import { NativeSyntheticEvent } from 'react-native'
import { useNavigation } from 'expo-router'

type Attractions = {
  id: string
  title: string
  image: string
}

function myItemSeparator() {
  return <S.Separator />
}

function ResultsNotFound() {
  const [assets] = useAssets([require('../src/assets/icons/sadface/sadface_icon.png')])
  if (!assets) {
    return null
  }

  return (
    <S.ResultsNotFound>
      <S.Icon source={assets[0] as ImageSourcePropType} />
      <S.BigText>No Results Found</S.BigText>
    </S.ResultsNotFound>
  )
}

export default function HomeScreen() {
  const navigator = useNavigation()
  const [search, setSearch] = useState('')
  const { data, loading } = useApiData<Attractions[]>(`attractions`, search)
  const [assets] = useAssets([require('../src/assets/images/logo/ET-Logo-horizontal.png')])
  const textRef = useRef('')
  const [selection, setSelection] = useState('')

  useEffect(() => {
    data?.push({ id: '', title: 'button', image: '' })
  }, [data])

  const onSelectItem = (id: string) => {
    setSelection(id)
  }

  const onGoToSelection = () => {
    navigator.navigate('detail/index' as never, { id: selection })
  }

  if (loading) {
    return <S.Text testID="home-screen-loading">Loading...</S.Text>
  }

  if (!assets) {
    return <S.Text testID="home-screen-loading">Loading...</S.Text>
  }

  const renderItem: ListRenderItem<Attractions> = ({ item }) => (
    <ScrollItem
      id={item.id}
      title={item.title}
      image={item.image}
      selectedId={selection}
      onSelectItem={onSelectItem}
      onGoToSelection={onGoToSelection}
    />
  )

  const inputOnChange = (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
    textRef.current = event.nativeEvent.text
  }

  const onTouchButton = () => {
    setSearch(textRef.current)
  }

  return (
    <ScreenLayout testID="home-screen-layout">
      <StatusBar style="auto" hidden={true} />
      <S.Bar testID="home-screen-bar">
        <S.Logo source={assets[0] as ImageSourcePropType} />
      </S.Bar>

      <S.Container testID="home-screen-content">
        <Stack.Screen options={{ title: 'Home Screen' }} />
        <S.TopContent>
          <S.Input placeholder="Search For Attractions" onChange={inputOnChange} />
          <LinkButton text="Submit" onTouch={onTouchButton} />
        </S.TopContent>

        <S.FlatList
          data={data}
          renderItem={renderItem}
          ItemSeparatorComponent={myItemSeparator}
          keyExtractor={(item) => (item as Attractions).title}
          ListEmptyComponent={<ResultsNotFound />}
        />
      </S.Container>
    </ScreenLayout>
  )
}

const S = {
  Logo: styled.Image`
    margin-left: 22px;
    margin-top: 26px;
  `,
  Icon: styled.Image`
    width: ${(p) => p.theme.size(50, 'px')}
    height: ${(p) => p.theme.size(50, 'px')}
  `,
  Bar: styled.View`
    align-items: left;
    justify-content: center;
    height: 85px;
    background-color: ${(p) => p.theme.background};
  `,
  Container: styled.View`
    flex: 1;
    background-color: ${(p) => p.theme.et_x_light_blue};
  `,
  ResultsNotFound: styled.View`
    width: ${(p) => parseInt(p.theme.windowWidth) * 0.6}px;
    height: ${(p) => parseInt(p.theme.windowHeight) * 0.2}px;
    border-radius: 18px;
    background-color: white;
    align-items: center;
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
    margin-top: ${(p) => p.theme.size(70, 'px')};
  `,
  TopContent: styled.View`
    flex-direction: row;
    align-items: stretch;
    height: 40px;
    margin-top: 20px;
  `,
  Input: styled.TextInput`
    flex: 2;
    padding: 3px 8px 3px 8px;
    border-width: 1px;
    border-radius: 10px;
    height: 40px;
    margin-right: 10px;
    margin-left: 10px;
    border-color: ${(p) => p.theme.et_light_blue};
    background-color: white;
  `,
  Text: styled.Text`
    color: ${(p) => p.theme.primary};
    font-weight: 700;
    font-size: ${(p) => p.theme.size(15, 'px')};
    margin-bottom: ${(p) => p.theme.size(15, 'px')};
  `,
  BigText: styled.Text`
    font-size: ${(p) => p.theme.size(33, 'px')};
    color: ${(p) => p.theme.primary};
    margin-top: ${(p) => p.theme.size(5, 'px')};
  `,
  FlatList: styled.FlatList``,
  Separator: styled.View`
    margin-vertical: 2px;
  `
}
