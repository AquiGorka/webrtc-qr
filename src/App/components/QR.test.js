import {progressBar} from './QR'

describe('progressBar', () => {
  it("renders 10%", () => {
    expect(
      progressBar({segments: {0: ''}, total: 10})
    ).toEqual('█▁▁▁▁▁▁▁▁▁ 10%')
  })

  it("renders which segments are missing", () => {
    expect(
      progressBar({segments: {5: ''}, total: 10})
    ).toEqual('▁▁▁▁▁█▁▁▁▁ 10%')
  })
})
