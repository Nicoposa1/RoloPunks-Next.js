import React from "react";
import { Box, Button, Flex, Image, Link, Spacer } from "@chakra-ui/react";

function NavBar(props) {
  const { accounts, setAccounts } = props;

  const isConnected = Boolean(accounts[0]);

  async function connectAccount() {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccounts(accounts);
    }
  }

  return (
    <Flex justify="space-between" align="center" padding="30px">
      <Flex justify="space-around" width="40%" padding="0 75px">
        <Link target="_blank" href="https://www.linkedin.com/in/nicolasposa/">
          <Image src="/725337.png" boxSize="42px" margin="0 15px" />
        </Link>
        <Link target="_blank" href="https://twitter.com/DevNico_">
          <Image src="/twitter_32x32.png" boxSize="42px" margin="0 15px" />
        </Link>
        <Link target="_blank" href="mailto:nicoposa57@gmail.com">
          <Image src="/email.png" boxSize="42px" margin="0 15px" />
        </Link>
      </Flex>

      <Flex
        justify="space-around"
        align="center"
        width="40%"
        padding="30px 30px 30px 30px "
      >
        <Box margin="0 15">About</Box>
        <Spacer />
        <Box margin="0 15">Mint</Box>
        <Spacer />
        <Box margin="0 15">Team</Box>
        <Spacer />
        {isConnected ? (
          <p>Connected</p>
        ) : (
          <Button onClick={connectAccount} backgroundColor="#D6517D" borderRadius="5px" boxShadow="0px 2px 2px 1px #0f0f0f" color="white" fontFamily="inherit" padding="15px" margin="0 15px">Connect</Button>
        )}
      </Flex>
    </Flex>
  );
}

export default NavBar;
