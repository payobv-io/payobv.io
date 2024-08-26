import { EscrowRequestFromDb } from "@/lib/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../dialog";
import { Button } from "../button";
import { CheckIcon, XIcon } from "lucide-react";
import { acceptBountyEscrow, rejectBountyEscrow } from "@/lib/actions";

type DialogProps = {
  open: boolean;
  type?: 'accept' | 'reject';
  selectedRequest?: EscrowRequestFromDb;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ConfirmationDialog({
  open,
  type,
  selectedRequest,
  setDialogOpen
}: DialogProps) {
  return (
    <Dialog open={open} onOpenChange={setDialogOpen}>
      <DialogContent className="sm:max-w-[425px]">
        {
          type === 'accept' 
          ?
            <>
              <DialogHeader>
                <DialogTitle>Approve Escrow Request</DialogTitle>
                <DialogDescription>
                  Are you sure you want to approve this escrow request? This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              {
              selectedRequest 
              ? 
                <>
                  <RequestDetail request={selectedRequest} />
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                    <Button 
                      onClick={() => {
                        acceptBountyEscrow(selectedRequest.id)
                        setDialogOpen(false)
                      }}
                      className="bg-green-600 hover:bg-green-700 text-white">
                      <CheckIcon className="mr-2 h-4 w-4" /> Approve
                    </Button>
                  </DialogFooter>
                </>
              : undefined
              }
            </>
          : 
          <>
            <DialogHeader>
              <DialogTitle>Reject Escrow Request</DialogTitle>
              <DialogDescription>
                Are you sure you want to reject this escrow request? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            {
              selectedRequest 
              ? 
                <>
                  <RequestDetail request={selectedRequest} />
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                    <Button
                      onClick={() => {
                        rejectBountyEscrow(selectedRequest.id)
                        setDialogOpen(false)
                      }} 
                      className="bg-red-600 hover:bg-red-700 text-white">
                      <XIcon className="mr-2 h-4 w-4" /> Reject
                    </Button>
                  </DialogFooter>
                </>
              : undefined
            }
          </>
        }
      </DialogContent>
    </Dialog>
  )
}

function RequestDetail({ request }: { request: EscrowRequestFromDb }) {
  return (
    <div className="py-4">
      <p className="text-sm text-gray-500">Issue: <span className="font-medium text-gray-900">{request.issueNumber}</span></p>
      <p className="text-sm text-gray-500">Amount: <span className="font-medium text-gray-900">{request.amount} SOL</span></p>
      <p className="text-sm text-gray-500">Repository: <span className="font-medium text-gray-900">{request.repository.name}</span></p>
    </div>
  )
}