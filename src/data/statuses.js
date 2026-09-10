export const Statuses = [
    {key: 'todo',    label: 'В планах',      className: 'status-todo'},
    {key: 'prep',  label: 'Препродакшн',    className: 'status-prep'},
    {key: 'shoot',   label: 'Съёмка',        className: 'status-shoot'},
    {key: 'post',   label: 'Постпродакшн',  className: 'status-post'},
    {key: 'done',   label: 'Готово',        className: 'status-done'}
]

export function statusByKey(key) {
    return Statuses.find((status) => status.key === key) || Statuses[0]
}

export function statusIndex(key) {
    return Statuses.findIndex((status) => status.key === key)
}