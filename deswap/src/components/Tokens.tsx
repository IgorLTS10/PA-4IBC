import React from 'react'

function Tokens() {
    return (
        <>
        <div>Tokens</div>
        <div>Tokens</div>
        <div>
            <form>
                <label>
                    Token address:
                    <input type="text" name="tokenAddressAdd" />
                </label>
                <input type="submit" value="Add Token" />
            </form>
        </div>
        <div>
            <form>
                <label>
                    Token address:
                    <input type="text" name="tokenAddressDelete" />
                </label>
                <input type="submit" value="Delete Token" />
            </form>
        </div>
        </>
    )
}

export default Tokens