import styled from 'styled-components/native'

interface Props {
  text: string
  onTouch: () => void
}

export default function LinkButton({ text, onTouch }: Props) {
  return (
    <S.Button testID="link-button" onTouchEnd={onTouch}>
      <S.LinkText testID="link-button-text">{text}</S.LinkText>
    </S.Button>
  )
}

const S = {
  Button: styled.View`
    display: flex;
    flex: 1;
    border-color: ${(p) => p.theme.et_light_blue};
    border-width: 1px;
    border-radius: 10px;
    background-color: ${(p) => p.theme.primary};
    overflow: hidden;
    elevation: 3;
    justify-content: center;
    align-items: center;
    padding-vertical: 9px;
    margin-right: 10px;
  `,
  LinkText: styled.Text`
    color: ${(p) => p.theme.et_x_light_blue};
    font-weight: 600;
    text-align: center;
    font-size: 14px;
    line-height: 21px;
  `
}
