import { GestureHandlerRootView } from 'react-native-gesture-handler'
import styled from 'styled-components/native'
import LinkButton from './LinkButton'
import { TouchableOpacity } from 'react-native'
import { truncateText } from 'src/utils/utils'

type Props = {
  id: string
  image: string
  title: string
  noTouch?: boolean
  selectedId: string
  onSelectItem: (id: string) => void
  onGoToSelection: () => void
}

type StyledTouchableOpacityProps = {
  selectedItem: boolean
}

export default function ScrollItem({ id, image, title, noTouch = false, selectedId, onSelectItem, onGoToSelection }: Props) {
  if (noTouch) {
    return (
      <S.Container testID="item-container" selectedItem={false}>
        <S.Image testID="item-image" src={image} />
        <S.Text testID="item-text">{truncateText(title, 25)}</S.Text>
      </S.Container>
    )
  }

  if (title === 'button') {
    return (
      <S.ButtonContainer>
        <LinkButton text="Select" onTouch={onGoToSelection} />
      </S.ButtonContainer>
    )
  }

  return (
    <GestureHandlerRootView>
      <TouchableOpacity onPress={() => onSelectItem(id)}>
        <S.Container testID="item-container" selectedItem={id === selectedId}>
          <S.Image testID="item-image" src={image} />
          <S.Text testID="item-text">{truncateText(title, 25)}</S.Text>
        </S.Container>
      </TouchableOpacity>
    </GestureHandlerRootView>
  )
}

const S = {
  Container: styled.View<StyledTouchableOpacityProps>`
    flex-direction: row;
    background-color: white;
    height: 59px;
    margin-top: 15px;
    margin-left: 10px;
    margin-right: 15px;
    ${({ selectedItem }) =>
      selectedItem &&
      `
    border-color: #5DBDF0;
    border-width: 1px;
  `}
  `,
  Text: styled.Text`
    color: ${(p) => p.theme.text};
    font-weight: 600;
    text-align: center;
    font-size: 16px;
    margin-left: 5px;
    text-transform: uppercase;
    padding-vertical: 20px;
  `,
  Image: styled.Image`
    height: 59px;
    width: 105px;
  `,
  ButtonContainer: styled.View`
    height: 40px;
    width: 91px;
    margin-left: auto;
    margin-right: auto;
    margin-vertical: ${(p) => p.theme.size(20, 'px')};
  `
}
