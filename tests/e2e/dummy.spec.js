describe('my awesome website', () => {
  it('should do some chai assertions', async () => {
    await browser.url('/')
    const title = await browser.getTitle()

    expect(title).toContain('WordPress Local')
  })
})
