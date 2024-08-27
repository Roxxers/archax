
// Actual class
class ExampleClass {
    async fetchAllRecords() {
        return await Promise.resolve([3, 2, 1])
    }
}

const fetchAllRecordsMock = jest.spyOn(ExampleClass.prototype, "fetchAllRecords").mockResolvedValue([1, 2, 3])

it('mocked method returns 1,2,3', async () => {
    const example = new ExampleClass()
    const result = await example.fetchAllRecords()
    expect(fetchAllRecordsMock).toHaveBeenCalled()
    expect(result).toEqual([1, 2, 3])
});