def get_historical_lending(df_loans):
    return df_loans.set_index('timeStamp')['wanted_wei'].sort_index().cumsum()


def get_collateral_count(df_loans):
    mask = (df_loans['TokenName'] != '')
    collateral_count = df_loans['TokenName'][mask].value_counts().reset_index()
    collateral_count = collateral_count.rename(
        columns={'index': 'label', 'TokenName': 'value'})
    return collateral_count


def get_amount_by_lender(df_loans):
    lenders = df_loans.groupby(
        'Lender')['NeededSumByBorrower'].sum().reset_index().dropna()
    return lenders.rename(columns={'Lender': 'address', 'NeededSumByBorrower': 'amount'})


def get_amount_by_borrower(df_loans):
    borrowers = df_loans.groupby(
        'Borrower')['NeededSumByBorrower'].sum().reset_index().dropna()
    return borrowers.rename(columns={'Borrower': 'address', 'NeededSumByBorrower': 'amount'})
