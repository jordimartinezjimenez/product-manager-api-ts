import { connectDB } from "../server"
import db from "../config/db"

jest.mock("../config/db")

describe("connectDB", () => {
    it("Should handle database connection error", async () => {
        jest.spyOn(db, "authenticate")
            .mockRejectedValue(new Error("Unable to connect to the database"))
        const consoleSpy = jest.spyOn(console, "log")

        await connectDB()

        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining("Unable to connect to the database")
        )
    })
})