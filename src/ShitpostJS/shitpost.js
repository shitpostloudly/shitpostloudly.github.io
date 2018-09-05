/**
 * Shitpost.JS shitpost framework (omegaLUL)
 */
const ShitpostJS = {
  submitToPastebin: async (devKey, text) => {
    if (!devKey || !text) return
    let formData = new FormData();
    formData.append('api_option', 'paste');
    formData.append('api_dev_key', devKey);
    formData.append('api_paste_private', 1)
    formData.append('api_paste_code', text);
    let maxTries = 3
    do {
      var resp = await fetch("https://cors-anywhere.herokuapp.com/https://pastebin.com/api/api_post.php", {
        method: 'POST',
        body: formData
      })
      var url = await resp.text()
      await timeout(500)
    } while (resp.status !== 200 && (maxTries--) > 0)
    return url
  },
  getPastebinShitpost: async (id) => {
    if (!id) return unescape(classicShitpost)
    const resp = await fetch(`https://cors.io/?https://pastebin.com/raw/${id}`)
    const text = await resp.text()
    if (resp.status !== 200) return unescape(classicShitpost)
    return text
  },
  getRandomRedditShitpost: async (id) => {
    const resp = await (await fetch("https://www.reddit.com/r/copypasta/.json")).json()
    const children = resp.data.children
    return children[Math.floor(Math.random() * children.length)]["data"]["selftext"]
  }
}

const timeout = ms => new Promise(res => setTimeout(res, ms))

/**
 * I've included a classic shitpost as a default
 */
export const classicShitpost = "Not%20only%20is%20finding%20the%20global%20optimum%20of%20a%20path%20given%20elevation%20data%20online%20illegal%2C%20online%20forums%20often%20come%20with%20%u201Cbonus%u201D%20features%20in%20the%20form%20of%20nasty%20plagiarized%20code%20and%20academic%20integrity%20violations.%20Stay%20legal%20and%20stay%20safe%2C%20code%20it%20yourself%20or%20if%20you%20don%u2019t%20want%20to%20pay%20for%20tutors%20just%20get%20good%2C%20which%20is%20mostly%20compatible%20and%20also%20requires%20you%20to%20understand%20the%20code.%20Remember%20that%20there%20are%20cheaper%20alternatives%20like%20a%20Bachelors%20of%20Science%20which%20is%20an%20awesome%20deal%20as%20a%20commercially%20made%20Engineering%20degree%20can%20cost%20tens%20of%20thousands%20of%20dollars."

export default ShitpostJS