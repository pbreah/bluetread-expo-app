import styled from 'styled-components/native'
import { Stack, useLocalSearchParams } from 'expo-router'
import ScreenLayout from 'src/components/ScreenLayout'
import { useAssets } from 'expo-asset'
import { ImageSourcePropType } from 'react-native'
import { height } from 'src/utils/dimensions'
import SocialBar from 'src/components/SocialBar'
import ShowDetailCard from 'src/components/ShowDetailCard'
import { StatusBar } from 'expo-status-bar'
import { useApiData } from 'src/utils/hooks'
import { truncateText } from 'src/utils/utils'

type UpcomingEvents = {
  name: string
  image: string
  venue: string
  city: string
  state: string
  date: string
}

type AttractionDetails = {
  name: string
  image: string
  externalLinks: Record<string, []>
  upcomingEvents: UpcomingEvents[]
}

const myItemSeparator = () => {
  return <S.Separator />
}

function ResultsNotFound() {
  const [assets] = useAssets([require('../../src/assets/icons/sadface/sadface_icon.png')])
  if (!assets) {
    return null
  }

  return (
    <S.ResultsNotFound>
      <S.Icon source={assets[0] as ImageSourcePropType} />
      <S.BigText>No Events Found</S.BigText>
    </S.ResultsNotFound>
  )
}

export default function Detail() {
  const params = useLocalSearchParams()
  const [assets] = useAssets([require('../../src/assets/images/logo/ET-Logo-horizontal.png')])
  const { id } = params
  const { data, loading } = useApiData<AttractionDetails>(`attractions/${id}`)

  if (loading || !data || !assets) {
    return <S.Text testID="home-screen-loading">Loading...</S.Text>
  }

  const { externalLinks } = data

  return (
    <ScreenLayout testID="home-screen-layout">
      <StatusBar style="auto" hidden={true} />
      <S.Bar testID="detail-screen-bar">
        <S.Logo source={assets[0] as ImageSourcePropType} />
      </S.Bar>

      <S.TopContainer>
        <S.ImageContainer src={data.image} />
      </S.TopContainer>

      <S.Container testID="detail-screen-content">
        <Stack.Screen options={{ title: 'Details' }} />

        <SocialBar
          title={truncateText(data.name ? data.name : '', 25)}
          x={externalLinks?.twitter[0].url}
          youtube={externalLinks?.youtube[0].url}
          spotify={externalLinks?.spotify[0].url}
          website={externalLinks?.homepage[0].url}
        />

        <S.FlatList
          data={data.upcomingEvents}
          renderItem={({ item }) => (
            <ShowDetailCard
              title={(item as UpcomingEvents).name}
              image={(item as UpcomingEvents).image}
              date={(item as UpcomingEvents).date}
              location={`${(item as UpcomingEvents).venue}, ${(item as UpcomingEvents).city}, ${(item as UpcomingEvents).state}`}
            />
          )}
          ItemSeparatorComponent={myItemSeparator}
          keyExtractor={(item) => `${(item as UpcomingEvents).name}-${(item as UpcomingEvents).date}`}
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
  Bar: styled.View`
    align-items: left;
    justify-content: center;
    height: 85px;
    background-color: ${(p) => p.theme.background};
  `,
  ImageContainer: styled.Image`
    height: ${height / 3}px;
    object-fit: cover;
  `,
  Container: styled.View`
    flex: 1;
    background-color: ${(p) => p.theme.et_x_light_blue};
  `,
  TopContainer: styled.View``,
  Text: styled.Text`
    color: ${(p) => p.theme.primary};
    font-weight: 700;
    font-size: ${(p) => p.theme.size(15, 'px')};
    margin-bottom: ${(p) => p.theme.size(15, 'px')};
  `,
  FlatList: styled.FlatList`
    flex: 2;
  `,
  Separator: styled.View`
    margin-vertical: 2px;
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
  Icon: styled.Image`
    width: ${(p) => p.theme.size(50, 'px')}
    height: ${(p) => p.theme.size(50, 'px')}
  `,
  BigText: styled.Text`
    font-size: ${(p) => p.theme.size(33, 'px')};
    color: ${(p) => p.theme.primary};
    margin-top: ${(p) => p.theme.size(5, 'px')};
  `
}
