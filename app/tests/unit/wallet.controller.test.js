const mongoose = require("./mock");
const WalletController = require("../../controllers/wallet.controller.js");

//broken test :/
describe("Wallet Controller Test", ()=>{
    
    it("should succeed as user doesn't have wallet", ()=>{
        //mock Model for testdouble
        const Wallet = {
            findOne: td.function(),
            save: td.function(),
        };

        //mocked values
        const mReq = {body:{username: "test"}};
        const mRes = {message:""};
        const expectedResponse = null;
        const expectedSuccessResponse = [{
            message:"Empty Wallet successfully registered."
        }];

        td.when(Wallet.findOne({ username: "test" })).thenResolve(expectedResponse);
        td.when(Wallet.save({})).thenResolve(expectedSuccessResponse);
        
        //compares the real function with mock        
        WalletController.insertEmptyWallet(mReq, mRes);
        
    });
});




