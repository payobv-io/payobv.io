'use client';

import { EscrowRequestFromDb } from '@/lib/types';
import { useState } from 'react';
import { Button } from '../../button';
import ConfirmationDialog from './confirmation-dialog';

type TableActionProps = {
  request: EscrowRequestFromDb;
};

export default function TableAction({ request }: TableActionProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<'accept' | 'reject' | undefined>(
    undefined
  );
  const [selectedRequest, setSelectedRequest] = useState<EscrowRequestFromDb>();

  const handleAcceptRequest = (request: EscrowRequestFromDb) => {
    setSelectedRequest(request);
    setDialogType('accept');
    setDialogOpen(true);
  };
  const handleRejectRequest = (request: EscrowRequestFromDb) => {
    setSelectedRequest(request);
    setDialogType('reject');
    setDialogOpen(true);
  };

  return (
    <div className="flex space-x-2 justify-center">
      <Button
        onClick={() => handleAcceptRequest(request)}
        size="sm"
        variant="outline"
        className="bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700 text-sm"
      >
        Approve
      </Button>
      <Button
        onClick={() => handleRejectRequest(request)}
        size="sm"
        variant="outline"
        className="bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 text-sm"
      >
        Reject
      </Button>
      <ConfirmationDialog
        open={dialogOpen}
        type={dialogType}
        selectedRequest={selectedRequest!}
        setDialogOpen={setDialogOpen}
      />
    </div>
  );
}
