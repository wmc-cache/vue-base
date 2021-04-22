import { mapValues, without } from "lodash-es"

export const commonDefaultProps = {
  actionType: 1,
  url: ""


}


export const textDefaultProps = {
  text: "内容",
  fontSize: "16px",
  ...commonDefaultProps
}

export const textStylePropNames = without(Object.keys(textDefaultProps), "actionType", "url", "text")


export const transformToComponentProps = <T extends { [key: string]: any }>(props: T) => {
  return mapValues(props, (item) => {
    return {
      type: item.constructor,
      default: item
    }
  })

}