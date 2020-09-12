import React, { ReactElement, useMemo } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import styled from "styled-components";

import { Button } from "@gnosis.pm/safe-react-components";

import { BigNumberish } from "@ethersproject/bignumber";
import { Zero } from "@ethersproject/constants";
import { StreamStatus, getStreamStatus } from "../Status";
import { ProxyStream } from "../../../types";
import { useSafeAddress } from "../../../contexts/SafeContext";
import { recipientShare } from "../../../utils/stream";

const lg: string = "24px";
const md: string = "16px";

const ActionsContainer = styled.div`
  align-content: space-around;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: ${lg} ${md};
`;

const StyledButton = styled(Button).attrs({
  color: "primary",
  size: "md",
  variant: "contained",
})`
  min-width: 120px;
`;

const StyledAnchor = styled.a.attrs({
  rel: "noopener noreferrer",
  target: "_blank",
})`
  color: ${props => props.theme.colors.white};
  text-decoration: none;
`;

const StreamActions = ({
  cancelStream,
  withdrawStream,
  proxyStream,
}: {
  cancelStream: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  withdrawStream: (amount: BigNumberish) => void;
  proxyStream: ProxyStream;
}): ReactElement => {
  const safeAddress = useSafeAddress();
  const sablierStreamUrl = useMemo(() => `https://app.sablier.finance/stream/${proxyStream.id}`, [proxyStream]);

  const triggerWithdrawal = () => {
    const { deposit, startTime, stopTime, withdrawals } = proxyStream.stream;
    const withdrawnBalance = withdrawals.reduce((accumulator, { amount }) => accumulator.add(amount), Zero);
    const availableBalance = recipientShare(deposit, startTime, stopTime).sub(withdrawnBalance);
    withdrawStream(availableBalance);
  };

  return (
    <ActionsContainer>
      <CopyToClipboard text={sablierStreamUrl}>
        <StyledButton>Copy Stream Link</StyledButton>
      </CopyToClipboard>
      <StyledButton>
        <StyledAnchor href={sablierStreamUrl}>View Stream</StyledAnchor>
      </StyledButton>
      <StyledButton disabled={proxyStream.recipient !== safeAddress?.toLowerCase()} onClick={triggerWithdrawal}>
        Withdraw
      </StyledButton>
      <StyledButton disabled={getStreamStatus(proxyStream) !== StreamStatus.Active} onClick={cancelStream}>
        Cancel
      </StyledButton>
    </ActionsContainer>
  );
};

export default StreamActions;
