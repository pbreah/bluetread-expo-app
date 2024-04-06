import { useAssets } from 'expo-asset'
import { ImageSourcePropType, Linking, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'

interface Props {
  title: string
  x: string
  youtube: string
  spotify: string
  website: string
}

export default function SocialBar({ title, x, youtube, spotify, website }: Props) {
  const [assets] = useAssets([
    require('../../src/assets/icons/x/Frame 33409.png'),
    require('../../src/assets/icons/youtube/Frame 33409 copy.png'),
    require('../../src/assets/icons/spotify/Frame 33409 copy 2.png'),
    require('../../src/assets/icons/website/website_icon.png')
  ])

  if (!assets) {
    return <S.Text>Loading...</S.Text>
  }

  const goToWebsite = (url: string) => {
    Linking.openURL(url)
  }

  return (
    <S.Container testID="social-bar">
      <S.Text testID="social-title">{title}</S.Text>
      <S.InnerContainer>
        <TouchableOpacity onPress={() => goToWebsite(x ? x : '#')}>
          <S.Image source={assets[0] as ImageSourcePropType} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => goToWebsite(youtube ? youtube : '#')}>
          <S.Image source={assets[1] as ImageSourcePropType} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => goToWebsite(spotify ? spotify : '#')}>
          <S.Image source={assets[2] as ImageSourcePropType} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => goToWebsite(website ? website : '#')}>
          <S.Image source={assets[3] as ImageSourcePropType} />
        </TouchableOpacity>
      </S.InnerContainer>
    </S.Container>
  )
}

const S = {
  Container: styled.View`
    background-color: ${(p) => p.theme.et_x_light_blue}
    flex-direction: row;
    justify-content: space-between;
  `,
  InnerContainer: styled.View`
    flex-direction: row;
    margin-left: ${(p) => p.theme.size(10, 'px')};
    margin-right: ${(p) => p.theme.size(15, 'px')};
    padding: ${(p) => p.theme.size(7, 'px')};
    padding-top: ${(p) => p.theme.size(12, 'px')};
  `,
  Text: styled.Text`
    color: ${(p) => p.theme.text};
    font-weight: 500;
    font-size: ${(p) => p.theme.size(26, 'px')};
    margin-bottom: ${(p) => p.theme.size(15, 'px')};
    margin-vertical: ${(p) => p.theme.size(15, 'px')};
    margin-left: ${(p) => p.theme.size(26, 'px')};
    text-transform: uppercase;
  `,
  Image: styled.Image`
    margin-horizontal: ${(p) => p.theme.size(1, 'px')}
    margin-vertical: ${(p) => p.theme.size(6, 'px')}
    padding-vertical: 9px;
  `
}
