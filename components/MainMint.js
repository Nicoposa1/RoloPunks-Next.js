import React, { useState } from "react";
import { ethers, BigNumber } from "ethers";
import RoloPunks from "../pages/RoloPunks.json";
import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";

const roloPunksAddress = "0x65e8679D57bB9EC047144CB78257979923f97750";

function MainMint(props) {
  const { accounts, setAccounts } = props;
  const [mintAmount, setMintAmount] = useState(1);
  const isConnected = Boolean(accounts[0]);

  async function handleMint() {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        roloPunksAddress,
        RoloPunks.abi,
        signer
      );
      try {
        const response = await contract.mint(BigNumber.from(mintAmount), {
          value: ethers.utils.parseEther((0.02 * mintAmount).toString()),
        });
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  }

  const handleDecrement = () => {
    if (mintAmount <= 1) return;
    setMintAmount(mintAmount - 1);
  };

  const handleIncrement = () => {
    if (mintAmount >= 3) return;
    setMintAmount(mintAmount + 1);
  };

  return (
    <Flex justify="center" align="center" height="100vh" paddingBottom="150px">
      <Box width="520px">
        <div>
          <Text fontSize="48px" textShadow="0 5px #000">
            RoloPunks
          </Text>
          <Text
            fontSize="30px"
            letterSpacing="-5.5%"
            fontFamily="VT323"
            textShadow="0 2px 2px #000"
          >
            It&apos;s 2078. Can the RoloPunks NFT save humans from destructive
            rampant NFT speculation? Mint RoloPunks to find out.
          </Text>
        </div>

        {isConnected ? (
          <div>
            <Flex align="center" justify="center">
              <Button
                backgroundColor="#D6517D"
                borderRadiu="5px"
                boxShadow="0px 2px 2px 1px #ofofof"
                onClick={handleDecrement}
              >
                -
              </Button>
              <Input
                color="black"
                type="number"
                value={mintAmount}
                backgroundColor="white"
                textAlign="center"
                readOnly
                width="100px"
                height="40px"
                paddingLeft="19px"
                marginTop="10px"
              />
              <Button
                backgroundColor="#D6517D"
                borderRadiu="5px"
                boxShadow="0px 2px 2px 1px #ofofof"
                onClick={handleIncrement}
              >
                +
              </Button>
            </Flex>
            <Button
              backgroundColor="#D6517D"
              borderRadiu="5px"
              boxShadow="0px 2px 2px 1px #ofofof"
              color="white"
              cursor="pointer"
              fontFamily="inherit"
              padding="15px"
              marginTop="15px"
              onClick={handleMint}
            >
              Mint Now
            </Button>
          </div>
        ) : (
          <div>
            <Text
              marginTop="70px"
              fontSize="30px"
              letterSpacing="-5.5%"
              fontFamily="VT323"
              textShadow="0 3px #000"
              color="#d6517D"
            >
              You must be connected to Mint
            </Text>
          </div>
        )}
      </Box>
    </Flex>
  );
}

export default MainMint;
