import styled from 'styled-components/native'
import { format } from 'date-fns'

type Props = {
  title: string
  image: string
  date: string
  location: string
}

export default function ShowDetailCard({ title, image, date, location }: Props) {
  const limitedTitle = title.length > 50 ? title.slice(0, 40) + '...' : title
  return (
    <S.Container testID="item-container">
      <S.Image testID="item-image" src={image} />
      <S.InnerContainer>
        <S.Date testID="event-date">{format(date, 'eeee, MMMM do, yyyy')}</S.Date>
        <S.Title testID="event-title">{limitedTitle}</S.Title>
        <S.Location testID="event-location">{location}</S.Location>
      </S.InnerContainer>
    </S.Container>
  )
}

const S = {
  Container: styled.View`
    flex-direction: row;
    background-color: white;
    min-height: 80px;
    max-width: ${(p) => parseInt(p.theme.windowWidth) * 0.95}px;
    margin-top: 15px;
    margin-left: 10px;
    margin-right: 15px;
    padding-right: 40px;
    overflow: hidden;
  `,
  InnerContainer: styled.View`
    background-color: white;
    margin-top: 12px;
    margin-left: 10px;
    margin-right: 15px;
    padding: ${(p) => p.theme.size(15, 'px')};
  `,
  Date: styled.Text`
    margin-bottom: 10px;
  `,
  Title: styled.Text`
    color: ${(p) => p.theme.text};
    font-weight: 600;
    font-size: 16px;
    margin-bottom: 10px;
    text-transform: uppercase;
  `,
  Location: styled.Text`
    color: ${(p) => p.theme.text};
    font-size: 12px;
    text-transform: uppercase;
    margin-bottom: 10px;
  `,
  Image: styled.Image`
    height: 100%;
    width: 105px;
  `
}
