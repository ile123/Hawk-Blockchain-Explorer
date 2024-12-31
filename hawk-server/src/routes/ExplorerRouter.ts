import express, { Request, Response, Router } from "express";
import { extractEmail, verifyJwt } from "./JWTHandler";
import { determineQueryType, sendRpcRequest } from "../helper";
import User from "../models/UserModel";
import axios from "axios";

export const ExplorerRouter = (): Router => {
  const explorerRouter: Router = express.Router();

  explorerRouter.get(
    "/get-block-info",
    verifyJwt,
    async (req: Request, res: Response): Promise<any> => {
      try {
        const { query } = req.query;
        // @ts-ignore
        const queryType = determineQueryType(query);
        const email = extractEmail(req.headers.authorization);
        if (!email) {
          return res
            .status(401)
            .json({ error: "Authorization header missing or invalid" });
        }

        const user = await User.findOne({ email });
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
        let queryTypeResult = query;
        if(queryType === "blockHeight") {
          //@ts-ignore
          queryTypeResult = await sendRpcRequest("getblockhash", [parseInt(query)])
        }
        const resultBestBlock = await sendRpcRequest("getblock", [
          queryTypeResult,
          2,
        ]);
        const resultBlockInfo = await sendRpcRequest("getblockstats", [queryTypeResult]);

        const result = {
          blockHash: resultBestBlock.hash,
          blockHeight: resultBestBlock.height,
          timestamp: resultBestBlock.time,
          txs: resultBlockInfo.txs,
          maxtxsize: resultBlockInfo.maxtxsize,
          avgfeerate: resultBlockInfo.avgfeerate,
          transactions: resultBestBlock.tx.map((tx: any) => ({
            txid: tx.txid,
          }))
        };

        const filter = { email: email };
        const update = { $addToSet: { viewedBlocks: query } };
        await User.updateOne(filter, update);
        
        return res.status(200).json(result);
      } catch (error: any) {
        console.error(
          "Error fetching best block or network info:",
          error.response?.data?.error || error.message
        );
        return res
          .status(500)
          .json({ error: "Error fetching best block or network info" });
      }
    }
  );

  explorerRouter.get(
    "/get-transaction-info",
    verifyJwt,
    async (req: Request, res: Response): Promise<any> => {
      try {
        const { query } = req.query;
        const email = extractEmail(req.headers.authorization);

        if (!email) {
          return res
            .status(401)
            .json({ error: "Authorization header missing or invalid" });
        }

        const user = await User.findOne({ email });
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }

        const rawTransaction = await sendRpcRequest("getrawtransaction", [
          query,
          1,
        ]);

        const result = {
          txid: rawTransaction.txid,
          hash: rawTransaction.hash,
          size: rawTransaction.size,
          weight: rawTransaction.weight,
          version: rawTransaction.version,
          blockHash: rawTransaction.blockhash,
          inputs: rawTransaction.vin.map((input: any) => ({
            txid: input.txid || "Coinbase Transaction " + input.coinbase,
            vout: input.vout || input.sequence
          })),
          outputs: rawTransaction.vout.map((output: any) => ({
            value: output.value,
            n: output.n
          })),
        };

        const filter = { email: email };
        const update = { $addToSet: { viewedTransactions: query } };
        await User.updateOne(filter, update);

        return res.status(200).json(result);
      } catch (error: any) {
        console.error(
          "Error fetching transaction info:",
          error.response?.data?.error || error.message
        );
        return res
          .status(500)
          .json({ error: "Error fetching transaction info" });
      }
    }
  );

  explorerRouter.get(
    "/get-address-info",
    verifyJwt,
    async (req: Request, res: Response): Promise<any> => {
      try {
        const { query } = req.query;
        if (!query || typeof query !== "string") {
          return res.status(400).json({ error: "Invalid query parameter" });
        }
  
        const email = extractEmail(req.headers.authorization);
        if (!email) {
          return res
            .status(401)
            .json({ error: "Authorization header missing or invalid" });
        }
  
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }

        const addressInfo = await sendRpcRequest("getaddressinfo", [query]);
        if (!addressInfo) {
          return res.status(404).json({ error: "Address not found or invalid" });
        }

        const result = {
          address: addressInfo.address,
          scriptPubKey: addressInfo.scriptPubKey,
          witness_version: addressInfo.witness_version,
          witness_program: addressInfo.witness_program,
          labels: addressInfo.labels,
        };

        const filter = { email: email };
        const update = { $addToSet: { viewedAddresses: query } };
        await User.updateOne(filter, update);
  
        return res.status(200).json(result);
      } catch (error: any) {
        console.error(
          "Error fetching address info:",
          error.response?.data?.error || error.message
        );
        return res
          .status(500)
          .json({ error: "Error fetching address info" });
      }
    }
  );

  explorerRouter.get("/search", verifyJwt,
    async (req: Request, res: Response): Promise<any> => {
    const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Query parameter is required." });
  }

  try {
    const results = {
      addresses: [],
      blocks: [],
      transactions: [],
    };
    // @ts-ignore
    const queryType = determineQueryType(query);

    if (queryType === "blockOrTransaction") {
      try {
        const block = await sendRpcRequest("getblock", [query]);
        // @ts-ignore
        results.blocks.push(block.hash);
      } catch (blockError) {
        try {
          await sendRpcRequest("getrawtransaction", [query, true]);
          // @ts-ignore
          results.transactions.push(query);
        } catch (txError) {
        }
      }
    } else if (queryType === "blockHeight") {
      try {
        // @ts-ignore
        const blockHash = await sendRpcRequest("getblockhash", [parseInt(query)]);
        // @ts-ignore
        results.blocks.push(blockHash);
      } catch (blockHeightError) {
        return res.status(404).json({ error: "Block height not found." });
      }
    } else if (queryType === "address") {
      try {
        await sendRpcRequest("getaddressinfo", [query]);
        // @ts-ignore
        results.addresses = [query];
      } catch (addressError) {
      }
    } else {
      return res.status(400).json({ error: "Invalid query format." });
    }

    return res.status(200).json(results);
  } catch (error) {
    console.error("Error during search:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

  return explorerRouter;
};

