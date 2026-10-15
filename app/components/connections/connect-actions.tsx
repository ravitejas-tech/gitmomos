import { useState } from 'react'
import { Github, Server } from 'lucide-react'
import { GiteaForm } from '~/components/connections/gitea-form'
import { Button } from '~/components/ui/button'
import { Modal } from '~/components/ui/modal'
import { Spinner } from '~/components/ui/spinner'
import { useStartGitHub } from '~/hooks/connections/mutations'

export function ConnectActions() {
    const [showGitea, setShowGitea] = useState(false)
    const { mutate: startGitHub, isPending, isSuccess } = useStartGitHub()

    return (
        <div className='flex items-center gap-1.5'>
            <Button
                variant='secondary'
                size='sm'
                onClick={() => setShowGitea(true)}>
                <Server />
                Connect Gitea
            </Button>
            <Button
                size='sm'
                onClick={() => startGitHub()}
                disabled={isPending || isSuccess}>
                {isPending || isSuccess ? <Spinner /> : <Github />}
                Connect GitHub
            </Button>
            {showGitea && (
                <Modal
                    title='Connect Gitea'
                    onClose={() => setShowGitea(false)}>
                    <GiteaForm onConnected={() => setShowGitea(false)} />
                </Modal>
            )}
        </div>
    )
}
