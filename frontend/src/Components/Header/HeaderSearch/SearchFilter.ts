import { category } from './Category'

export const filterCategory = (str: string) => {
  const bigCat = Object.keys(category)
  const cat = category as any
  let isBigSearch = false
  let result: any = []

  bigCat.forEach(c => {
    // search with wide category name
    if (!isBigSearch && (c.includes(str) || cat[c].name.includes(str))) {
      isBigSearch = true
      result = [cat[c].name, ...Object.values(cat[c].sub)]
    }
  })
  if (isBigSearch) return [...new Set(result)]

  result = []
  let bigCatn = ''
  let smalls: any[] = []

  bigCat.forEach(c => {
    const ko = Object.values(cat[c].sub)
    const en = Object.keys(cat[c].sub)

    if (checkHas(str, ko, en)) {
      bigCatn = c

      ko.forEach((k: any) => {
        if (k.includes(str)) smalls.push(k)
      })

      en.forEach((e: any) => {
        if (e.includes(str) && !smalls.includes(cat[c].sub[e]))
          smalls.push(cat[c].sub[e])
      })

      result = [...result, cat[bigCatn].name, ...smalls]
    }
  })

  return [...new Set(result)]
}

const checkHas = (str: string, ko: any[], en: any[]) => {
  let has = false

  ko.forEach((k: any) => {
    if (k.includes(str)) has = true
  })

  en.forEach((k: any) => {
    if (k.includes(str)) has = true
  })

  return has
}
