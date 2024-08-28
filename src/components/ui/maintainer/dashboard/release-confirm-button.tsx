"use client"

import { Button } from "../../button"

type ReleaseConfirmButtonProps = {
  bountyId: number
}

const ReleaseConfirmButton = ({ bountyId }: ReleaseConfirmButtonProps ) => {
  return (
    <Button
      onClick={() => {
        // TODO: Release the escrow
        console.log(`Releasing escrow for bounty #${bountyId}`)
      }}
      size="sm" variant="outline" className="bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700 text-sm">
      Confirm Release
    </Button>
  )
}

export default ReleaseConfirmButton